# dailytoken

[![ci][1]][2]

## Overview

DailyToken is a small React Native app that reveals one token per day. Users start with a mystery card and can tap
Reveal to see the day's token with a smooth loading animation and a short fade/scale-in transition. After a token is
revealed, a countdown shows the time left until 00:00:00 UTC, when the card resets for the next day. A "Trade on Matcha"
call-to-action opens the browser to a prefilled Matcha URL for the token.

### Key features

- Daily reveal flow with animated loading ring and reveal transition
- Token card with name, symbol, price, and percentage change
- Decorative wreath icons and a central token symbol
- Countdown timer to next UTC midnight; auto-reset at expiry
- Trade on Matcha CTA built via a dedicated URL utility

## Getting Started

### Prerequisites

#### Environment

- A [React Native environment][4] with standard, up-to-date tools

### Installation

1. Install dependencies

```sh
yarn
```

2. For iOS, install pods

```sh
npx pod-install
```

3. Start the app

```sh
yarn android
# or
yarn ios
```

## Testing

Run the tests with:

```sh
yarn test
```

[1]: https://github.com/fbluemle/dailytoken/workflows/ci/badge.svg
[2]: https://github.com/fbluemle/dailytoken/actions
[4]: https://reactnative.dev/docs/environment-setup
