---
theme: default
title: Frontend Development
subtitle: Node, TypeScript, Nunjucks & GOV.UK Design System
transition: view-transition
mdc: true
---

# Frontend Development
Node, TypeScript, Nunjucks & GOV.UK Design System

---

# Housekeeping

<!-- TODO: Link the required JIRA -->
- Request a docker license on JIRA
- Justification: 'Required for the graduate engineering academy'

---

# What we'll cover
- HTTP
- HTML, CSS and JS
- HTML Templating
- Nunjucks
- GovUK Design System
- UI Project best practices.

---

# Notes from Thursday
- PRs shouldn't be more than a few hundred lines unless there's a good reason.

- Large PRs are a red flag that your doing too much in one go.

- Use HTTP natively to convey information about your request or response.

- The status code and request verb convey a lot of information about what happened / what the request does.

- You don't need to send a custom success indicator or response message indicating what happened. HTTP largely does this for you.

---

# HTTP Verbs
How REST APIs use HTTP methods

| Verb     | Purpose           | Example Endpoint       | Description                          |
| -------- | ----------------- | ---------------------- | ------------------------------------ |
| `GET`    | **Read/Fetch**    | `GET /users`           | Retrieve data (should not modify)    |
| `POST`   | **Create**        | `POST /users`          | Create a new resource                |
| `PUT`    | **Replace**       | `PUT /users/123`       | Replace entire resource              |
| `PATCH`  | **Update**        | `PATCH /users/123`     | Partial update (change some fields)  |
| `DELETE` | **Remove**        | `DELETE /users/123`    | Delete a resource                    |

---

# HTTP Status Codes
Success Indicators

| HTTP Code | Meaning      | Description                               |
| --------- | ------------ | ----------------------------------------- |
| [200](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200) | OK | Request succeded |
| [201](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201) | Created | Request succeded and resource created |
| [204](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204) | No Content | Request succeded and no content returned |

Redirection indicators

| HTTP Code | Meaning             | Description                               |
| --------- | ------------------- | ----------------------------------------- |
| [301](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301) | Moved Permanently | Redirects to a new URL |



---

# HTTP Status Codes
Client Error Indicators

| HTTP Code | Meaning | Description |
| --------- | ------- | ----------- |
| [400](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400) | Bad Request | Something about the request is wrong |
| [401](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401) | Unauthorised | The requester is not authenticated |
| [403](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/403) | Forbidden | The requester is not authorised |
| [404](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404) | Not Found | The requested resource is not found |
| [405](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405) | Method Not Allowed | Endpoint does not support the HTTP Verb used |
| [418](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/418) | I'm a Teapot | Server refuses to brew coffee because it is permanently a tea pot |

---

# HTTP Status Codes
Server Error Indicators

| HTTP Code | Meaning                   | Description                                                        |
| --------- | ------------------------- | ------------------------------------------------------------------ |
| [500](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500) | Internal Server Error | The server encountered a situation it doesn't know how to handle |
| [501](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/501) | Not Implemented | The request method is not supported by the server |
| [502](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/502) | Bad Gateway | The server, acting as a gateway, received an invalid response |
| [503](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/503) | Service Unavailable | The server is not ready (down for maintenance or overloaded) |
| [504](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/504) | Gateway Timeout | The server, acting as a gateway, didn't get a response in time |
| [505](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/505) | HTTP Version Not Supported | The HTTP version used in the request is not supported |


---

# HTML
HyperText Markup Language - The **structure** of web pages

- HTML uses **tags** to define elements: `<tagname>content</tagname>`
- Every page has `<html>`, `<head>`, and `<body>` sections
- **Semantic tags** describe meaning: `<header>`, `<nav>`, `<main>`, `<footer>`
- Common elements: `<div>`, `<p>`, `<a>`, `<img>`, `<form>`, `<input>`, `<button>`
- Attributes add extra info: `<a href="/about">About</a>`

```html
<form action="/submit" method="POST">
  <label for="name">Name:</label>
  <input type="text" id="name" name="name">
  <button type="submit">Submit</button>
</form>
```

🔗 [MDN HTML Reference](https://developer.mozilla.org/en-US/docs/Web/HTML)

---

# CSS
Cascading Style Sheets - The **appearance** of web pages

- CSS controls colours, fonts, spacing, and layout
- **Selectors** target elements: `element`, `.class`, `#id`
- **Properties** set styles: `color`, `font-size`, `margin`, `padding`
- The **box model**: content → padding → border → margin

```css
.button {
  background-color: #1d70b8;  /* GDS blue */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
}
```

> With GOV.UK Design System, most styling is handled for you!

🔗 [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS)

---

# JavaScript
The **behaviour** and interactivity of web pages

- Runs in the browser (client-side) or on servers (Node.js)
- Manipulates HTML via the **DOM** (Document Object Model)
- Handles **events**: clicks, form submissions, key presses

```javascript
// Client-side: respond to a button click
const button = document.querySelector('.submit-btn');
button.addEventListener('click', (event) => {
  event.preventDefault();
  console.log('Button clicked!');
});
```

> In server-rendered apps, you'll write less client-side JS, the server does more work.

🔗 [MDN JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

# HTML Templating
Generating HTML dynamically from data

**The problem:** Static HTML can't display dynamic content (user data, database records, etc.)

**The solution:** Templating engines combine **templates** + **data** → **HTML**

```
Template + Data = HTML
─────────────────────────────
"Hello, {{ name }}!" + { name: "Sarah" } = "Hello, Sarah!"
```

**Why use templates?**
- **Reusability**: Write once, use in multiple places
- **Maintainability**: Layout and style of the page is seperate from code

**Popular templating engines:** Nunjucks, Handlebars, EJS, Pug

---

# Nunjucks
A powerful templating engine for JavaScript

- Created by **Mozilla**, inspired by Python's Jinja2
- Works with **Node.js** (server-side) and in browsers
- Used extensively in **GOV.UK** projects

**Key features:**
- Simple syntax with `{{ }}` for variables
- Template inheritance (extend base layouts)
- Macros (reusable template functions)
- Filters to transform data
- Integrates easily with Express

```bash
npm install nunjucks @types/nunjucks
```

> We use Nunjucks because it's powerful, readable, and pairs perfectly with GOV.UK Design System components.

🔗 [Nunjucks Documentation](https://mozilla.github.io/nunjucks/)

---

# Nunjucks Templating Syntax
The building blocks you'll use every day

**Variables** - Output data:
```html
<h1>Hello, {{ user.name }}!</h1>
```

**Conditionals** - Show/hide content:
```html
{% if user.isAdmin %}
  <a href="/admin">Admin Panel</a>
{% endif %}
```

**Loops** - Repeat elements:
```html
{% for item in items %}
  <li>{{ item.name }}</li>
{% endfor %}
```

---

# Nunjucks Templating Syntax

**Filters** - Transform data:
```html
{{ name | capitalize }}  <!-- "sarah" → "Sarah" -->
{{ price | round(2) }}   <!-- 19.999 → 20.00 -->
```

**Comments** - Notes that won't appear in output:
```html
{# This is a comment - users won't see this #}
```

**Include** - Insert another template:
```html
{% include "partials/header.njk" %}
```

**Set** - Create variables in templates:
```html
{% set greeting = "Welcome back" %}
<h1>{{ greeting }}, {{ user.name }}!</h1>
```

---

# GOV.UK Design System
A design system for UK government services

- **Consistent**: Same look and feel across all government services
- **Accessible**: Meets WCAG 2.1 AA standards out of the box
- **Tested**: Components tested with real users across diverse needs
- **Maintained**: Actively updated by GDS

**What it provides:**
- Pre-built **components**: buttons, forms, tables, panels, error messages
- **Patterns**: common user flows (addresses, dates, check answers)
- **Styles**: typography, colours, spacing, layout
- **Nunjucks macros**: ready to use in your templates

🔗 https://design-system.service.gov.uk/

---

# Using GDS in a Nunjucks Project
Setting up GOV.UK Frontend

**1. Install the package:**
```bash
npm install govuk-frontend
```

**2. Configure Express to serve assets:**
```javascript
app.use('/assets', express.static(
  path.join(__dirname, 'node_modules/govuk-frontend/dist/govuk/assets')
));
```

**3. Import macros in your templates:**
```html
{% from "govuk/components/button/macro.njk" import govukButton %}
{% from "govuk/components/input/macro.njk" import govukInput %}
```

**4. Configure Nunjucks to find GDS templates:**
```javascript
nunjucks.configure(['views', 'node_modules/govuk-frontend/dist'], { ... });
```

---

# Creating a Template
Building a page with GDS components

```html
{% extends "layouts/base.njk" %}

{% from "govuk/components/input/macro.njk" import govukInput %}
{% from "govuk/components/button/macro.njk" import govukButton %}

{% block content %}
  <h1 class="govuk-heading-l">Enter your name</h1>
  
  <form action="/submit" method="POST">
    {{ govukInput({
      label: { text: "Full name" },
      id: "full-name",
      name: "fullName"
    }) }}
    
    {{ govukButton({ text: "Continue" }) }}
  </form>
{% endblock %}
```

> Macros accept objects with options—check the GDS docs for all available settings.

---

# Base Templates
Template inheritance with `extends` and `block`

**Base template** (`layouts/base.njk`):
```html
<!DOCTYPE html>
<html lang="en" class="govuk-template">
<head>
  <title>{% block title %}My Service{% endblock %}</title>
  <link rel="stylesheet" href="/assets/govuk-frontend.min.css">
</head>
<body class="govuk-template__body">
  {% include "partials/header.njk" %}
  
  <main class="govuk-main-wrapper">
    {% block content %}{% endblock %}
  </main>
  
  {% include "partials/footer.njk" %}
</body>
</html>
```

**Child templates** extend the base and override blocks—no need to repeat boilerplate!

---

# UI Project Structure
Organising your frontend code

```
src/
├── routes/              # Express route handlers
│   └── home.ts
├── views/               # Nunjucks templates
│   ├── layouts/         # Base templates
│   │   └── base.njk
│   ├── partials/        # Reusable fragments
│   │   ├── header.njk
│   │   └── footer.njk
│   └── pages/           # Page templates
│       ├── home.njk
│       └── form.njk
├── public/              # Static assets (CSS, JS, images)
└── app.ts               # Express app setup
```

**Tips:**
- Keep templates small and focused
- Use partials for repeated elements
- Follow GDS guidelines

---
