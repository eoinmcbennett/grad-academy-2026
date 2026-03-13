## Self-review checklist

Work through each item before requesting a review. Unchecked items will likely
become review comments.

### Design & Structure
- [ ] Does each function or method have a single, clear purpose?
- [ ] Are your route handlers doing more than calling a controller method?
- [ ] Is any business logic or data access happening inside a controller?
- [ ] Do any of your services know about HTTP requests or responses?
- [ ] Are `app.ts` and `index.ts` each doing only their one job?
- [ ] Is your `src/` folder structured so that a new developer could find any file by its responsibility?

### Naming & Readability
- [ ] Do your class names read as nouns?
- [ ] Do your function and method names describe what they do, as verbs?
- [ ] Do your route paths describe resources or actions?
- [ ] Could someone unfamiliar with your code tell what each variable holds from its name alone?

### TypeScript & Types
- [ ] Is TypeScript running in strict mode?
- [ ] Have you used `any` anywhere — and if so, could a proper type be used instead?
- [ ] Can the properties of your domain model objects be changed after they are created?
- [ ] If you change your validation schema, do your DTO types update automatically, or would they fall out of sync?
- [ ] Does your request DTO include any fields the client shouldn't be providing?
- [ ] Does your response DTO include anything the client has no need to see?

### Validation
- [ ] Is incoming request body data validated before it reaches your controller logic?
- [ ] Are you accounting for the fact that URL parameters always arrive as strings?
- [ ] When validation fails, does the response tell the client which field is invalid and why?
- [ ] If a user disabled JavaScript in their browser, would your server still reject invalid input?

### Error Handling
- [ ] Does the HTTP status code on each response accurately reflect the outcome?
- [ ] What does a client receive when something goes wrong on the server — is it safe to share?
- [ ] Are there any async operations where an error could go unhandled?
- [ ] What happens in your frontend service if the backend API is unavailable or returns an error?
- [ ] What would happen if a user refreshed the page immediately after submitting a form?

### Security
- [ ] Could someone clone this repo and find any credentials, secrets, or connection strings?
- [ ] Is user-supplied input ever included directly in a database query string?
- [ ] What would be rendered in the browser if a user submitted `<script>alert('xss')</script>` as a form value?
- [ ] Are you treating form input values as the correct data type throughout, or just as strings?

### Database (Prisma)
- [ ] How many database client instances does your application create, and where?
- [ ] Are there any database calls that might complete after a response has already been sent?
- [ ] How do you distinguish between a record not being found and an unexpected error?
- [ ] What happens if someone calls update or delete with an ID that doesn't exist?
- [ ] Is every schema change you made tracked in a migration file?
- [ ] Do your controllers or routes need to know anything about the database library being used?

### Frontend (if applicable)
- [ ] Is there any route path that could accidentally be matched by a dynamic URL parameter?
- [ ] Do any of your forms use HTTP methods that browsers don't natively support?
- [ ] How does your app tell the difference between a create and a delete form submission?
- [ ] Is there any logic in your templates that belongs in a controller or service instead?

### Testing
- [ ] Is every new function or feature covered by at least one test?
- [ ] Can you clearly identify the setup, the action under test, and the assertion in each test?
- [ ] Does each test name describe the specific behaviour it is verifying?
- [ ] Could the order your tests run in affect the results?
- [ ] How would you replace a real service with a fake one when testing a controller?
- [ ] Have you tested what happens when things go wrong, not just when they succeed?
- [ ] Do any of your unit tests depend on a running database or external service?