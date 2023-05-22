# Dynamic parallax

This app was created as an excercise for Astronomy course AK1 - 2022/2023

> Unveil the secrets of the cosmos with an app designed to transform your understanding of binary star systems! It's a window to the heavens, inviting you to marvel at the elegance and enormity of the cosmos, one binary star system at a time. Dive in and let the stellar adventure begin!

The app calculates the physical properities of the observed binary star systems using the method of dymanic parallax. Given the observation data (angular dimensions of the orbit, relative magnitude of each star and the duration of the observation) it calculates:
- the distance of the star system from Earth
- the absolute magnitude of each star
- the luminocity of each star
- the mass of each star

Each calculation transports you millions of light years away, turning the abstract into reality 😉

The core of the logic is in [lib/compute.ts](https://github.com/incik/dynamic-parallax/blob/main/lib/compute.ts) file.  You may wonder how JavaScript/TypeScript, traditionally limited in handling very large numbers, could deliver such a performance. That' why [math.js](https://mathjs.org/) library was used.It overcomes the hurdles of JavaScript/TypeScript (such as floating point arithmetic errors), ensuring that our stargazing quest remains unhindered.

![app](https://github.com/incik/dynamic-parallax/assets/303200/eff7fcbb-b5b1-4641-9cb7-8c1f6fa4cf94)

## Prerequisites

- [Node.js](https://nodejs.org/) version 12.x or higher
- [npm](https://www.npmjs.com/get-npm) version 6.x or higher (normally comes with Node.js install)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/incik/dynamic-parallax.git
```

2. Navigate to the project directory:

```bash
cd repository
```

3. Install the dependencies:

```bash
npm install
```

## Usage

To run the app in development mode:

```bash
npm run dev
```

Open http://localhost:3000 with your browser to see the result.

## Production

To create a production build and start server:

```bash
npm run build
npm start
```
