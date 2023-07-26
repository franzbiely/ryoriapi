<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).


## Paymongo documentation

﻿I'll be providing a short summary of our Credit Cards, Direct Online Banking, GCash, and Maya documentation here:
﻿
﻿In a Nutshell: Accepting Credit Cards, Direct Online Banking, GCash, and Maya Payments
﻿Credit Cards, Direct Online Banking, GCash, and Maya follow the Payment Intent - Payment Method (PIPM) workflow.
﻿
﻿1. Create A Payment Intent from the server-side
﻿When a customer initiates a credit card or a PayMaya payment, create a payment intent by calling our Create A Payment Intent API: https://developers.paymongo.com/reference/create-a-paymentintent. Store the Payment Intent ID.
﻿
﻿2. Create a Payment Method from the client-side
﻿Collect Card Information from the client-side with the use of forms. We do not recommend storing this information on your server. Send this information over to us and we'll handle the rest! Create a payment method by calling our Create A Payment Method API: https://developers.paymongo.com/reference#create-a-paymentmethod. Store the Payment Method ID.
﻿
﻿3. Attach the Payment Intent to the Payment Method
﻿Connect the Payment Intent to the Payment Method by calling our Attach To Payment Intent API: https://developers.paymongo.com/reference/attach-to-paymentintent.
﻿
﻿4. Redirect the Customer for Authentication
﻿In live transactions or 3DS enabled test cards, the response for the Attach To Payment Intent call would include next_action. You would have to redirect the customer to their respective bank/e-wallet for them to authorize the payment.
﻿
﻿5. Finish
﻿Once this is done, the customer is redirected to your success/failed URL. If you setup your webhooks, we'll also send you a webhook event whether the payment is successful or failed. You can also asynchronously call the Retrieve A Payment Intent API to check the status of the intent. https://developers.paymongo.com/reference/retrieve-a-paymentintent
﻿
﻿I hope this helps! Just let me know if you have more questions and I'll be right with you! 👍
Your developer partner,
﻿Steven