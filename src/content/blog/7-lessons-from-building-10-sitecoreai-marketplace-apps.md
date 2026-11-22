---
title: 7 lessons from building 10 SitecoreAI Marketplace apps
description: What I learned after building ten apps for the SitecoreAI Marketplace, from which apps people really use to the work that comes after the app is finished.
pubDate: 2026-11-21
tags: [marketplace, sitecoreai, nextjs, security]
audience: [developers, business]
---

This year I built ten apps for the SitecoreAI Marketplace. Some of them are small panels inside Pages, like Publishing Center and Versions Cleanup Tool. Others are full screen tools, like Workbox, Redirects and Content Transfer Console. All of them started from a problem I had on a real project, something that was manual, slow, or not possible at all in SitecoreAI.

After ten apps I made most of the possible mistakes, some of them more than once. In this post I want to share the seven things I would like to have known before the first app. Most of the post is for developers, but there is a section at the end for people who do not write code.

## 1. Apps for developers are used more than apps for content authors

I built apps for two different groups. Content Transfer Console, Experience Edge Console, Webhooks and Content Publish Inspector are for developers and admins. Dictionary Editor, Redirects, Workbox and Publishing Center are for content authors.

What I found is that the apps for developers are the ones the community uses the most. I think there are some reasons for that:

- Developers are the ones who look for apps. They follow the community channels and they try new things. Most content authors do not know the Marketplace exists.
- A developer can install an app. A content author needs to ask someone with access to do it, and this request goes to the end of a long list.
- When a developer installs a developer tool, the developer gets the benefit. When a developer installs an app for authors, somebody else gets the benefit, and the developer is the one who needs to explain it and support it.

It does not mean apps for authors are not worth building. But the person who uses the app and the person who decides to install it are not the same, so the description of the app needs to talk to the second one: what the app needs, what it stores, and how much work it is to roll out.

## 2. Check what the API can do before designing the screens

When I started Workbox, I designed it like the classic Workbox: you select a workflow state and you see the items in that state. Then I found that the Authoring GraphQL API has no query for "items in this workflow state".

The app had to work in the opposite way. It searches the items under a path and reads the workflow state from each one. This changed many things in the design, because paging, counters and filters now depend on a scan and not on a direct query.

It was not the only case. The Authoring API works with items, media, templates, sites and search, but it cannot create roles or users. In another app I needed roles, and the solution was to generate a PowerShell script for the admin to run.

Now, before designing any screen, I write the queries the screen depends on and I run them in a real environment. If one of them does not exist, it is better to know it on the first day.

## 3. Do not ask for credentials if the SDK can do the job

Every credential the app stores is one more thing to protect, to document and to explain in the security review. The Marketplace SDK already runs as the logged in user and has access to the environments where the app is installed, so this should be the first option.

Content Transfer Console has two modes because of this:

| Mode | How it connects | Credentials |
| --- | --- | --- |
| Organization | Marketplace SDK, as the current user | None |
| Cross-Organization | The app's own API routes | Client ID and secret for each environment |

Most people transfer content inside the same organization, and they never see a credentials form. Only who needs to transfer to another organization has to enter them.

## 4. The API routes of your app are public

The SDK authenticates the user in the browser, but it does not give anything to the server to verify. If the app has API routes, for example to fetch a page or to call an admin API, they are normal public URLs. Anyone who knows the URL can call it, from outside of Sitecore.

I only noticed this after some apps were already built, and I had to go back and fix all of them. The solution is to send an access token on each request and validate it on the server before doing anything:

```ts
// src/lib/marketplace-auth/server.ts (simplified)
const { payload } = await jwtVerify(token, jwks, {
  issuer: 'https://auth.sitecorecloud.io/',
  audience: 'https://api-webapp.sitecorecloud.io',
});

// The token must be issued for this app, not for any Sitecore app
if (payload.azp !== process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID) {
  throw new Error('Wrong client');
}
```

It is worth noting that the organization ID is not in a claim called `org_id`. It comes with a namespace: `https://auth.sitecorecloud.io/claims/org_id`. Before I found this, all the routes that depend on the organization were rejecting valid users.

## 5. Take care with stored secrets and with requests to URLs typed by the user

These two things appear in almost every admin app.

The first one is storing a secret. Some of my apps keep a client secret or an API key, so the user does not need to enter it every time. Encrypting the value is not enough. If someone copies the encrypted value to the settings of another organization and it still works, the encrypted value is the same as a password. To avoid it, I bind each secret to the organization and to the client ID, using the additional data of AES-GCM:

```ts
// src/lib/edge/secret-crypto.ts (simplified)
const cipher = createCipheriv('aes-256-gcm', key, iv);
// It only decrypts for the same organization and client ID
cipher.setAAD(Buffer.from(`${organizationId}:${clientId}`));
```

The second one is fetching a URL the user typed. A button like "Test this webhook" or "Check this page" makes your server call an address that somebody else chose. Without limits, it can be used to reach internal addresses that the user should not see. My routes only allow HTTPS, block private and internal addresses when the connection is made, do not follow redirects, and have a timeout and a maximum response size.

These are the first things a security review will look for, and it is much less work to do them from the beginning.

## 6. Store the app settings inside Sitecore

Almost every app needs to save some settings: which template a site uses, a URL, an option the admin turned on. A Marketplace app does not come with a database, and I did not want to add one only for a few settings.

The technique I used in all the apps is to store the settings in the content tree. Each app has its own folder under `/sitecore/system/Modules/Marketplace`, with one Settings item inside. All the settings are serialized as JSON and saved in a single field of this item:

```
/sitecore/system/Modules/Marketplace
  /Redirect Manager
    /Settings        <- "Value" field with the settings as JSON
  /Webhooks
    /Settings
```

Reading is one query for the item and a `JSON.parse`. If the item does not exist or the content is not valid, the app uses the default values:

```ts
// src/utils/settings.ts (simplified)
const raw = await getItemFieldValue(client, contextId, SETTINGS_ITEM_PATH, 'Value', 'en');
if (!raw) return { ...DEFAULT_SETTINGS };

const parsed = JSON.parse(raw);
return { ...DEFAULT_SETTINGS, ...parsed };
```

The folders and the item are not installed with the app. They are created the first time an admin saves the settings, using the Authoring API, so there is no package or setup step.

This approach has some advantages:

- No database or external storage. The app is still only a front end and a few API routes.
- The settings belong to the environment. Each environment has its own values, and they can be moved or backed up like any other item.
- Sitecore security applies. Only who can write under `/sitecore/system` can change the settings, and the other users only read them.
- Adding a new setting is only a new property in the JSON. There is no template to change.

It is worth noting that this is for the settings of the app, not for the preferences of each user. Things like the page size or the last selected filter I keep in the local storage of the browser, because a content author usually cannot write under `/sitecore/system`. And if the app needs to store a secret, it must be encrypted before it goes to the item, as described in the previous lesson.

## 7. Finishing the app is half of the work

A public Marketplace app will be installed by people you do not know, inside the Sitecore of their company. The submission asks for much more than a working app. For each app I needed:

- Privacy policy, terms, a data usage document and a security policy.
- Security headers, including a content security policy that only allows Sitecore to load the app in a frame:

```ts
// next.config.ts
{ key: 'Content-Security-Policy', value: "frame-ancestors 'self' https://*.sitecorecloud.io" }
```

- Fonts hosted with the app and no third-party analytics, so the app does not send customer traffic to other services.
- A CI pipeline that builds the app, fails when a dependency has a high severity issue, and generates the SBOM.
- A QA checklist, executed inside a non-production SitecoreAI environment.

The last item is the most important. A Marketplace app only runs inside Sitecore, so a build that passes only tells you the code compiles. It does not tell you that a GraphQL query returns what you expect. In every app I found at least one problem that only appeared when testing in a real environment.

My suggestion is to write the privacy and data usage documents while building the app, not at the end. They also help with the design, because it is easier to not collect a piece of data than to explain why you collect it.

## For people who do not write code

If you are responsible for a SitecoreAI platform, this is what I would take from this post:

- Marketplace apps are a good way to solve the small problems of every day, like "is this page really published?" or "what is waiting for my approval?".
- Ask what the app stores and where it sends data. If the app asks for credentials, ask why.
- Install it first in a non-production environment.
- Tell your developers what takes too much time. All my apps started from a complaint like this.

## Final thoughts

Building the apps was the easy part. Understanding who uses them, what the API allows, and what a public app needs in terms of security and documentation is what took most of the time. I hope these lessons save some of that time for you. In the next posts I will write about some of the apps in more detail.
