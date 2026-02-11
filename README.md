## ⚠️ Beta Warning

This package was created with AI assistance and is currently in **beta**. Use in production at your own risk.

Please try it out and report any issues or suggestions you may have!

# lite-i18n

A lightweight, type-safe string translation library for TypeScript/JavaScript.

## Features

- 📦 **Universal**: Works with Parcel, Vite, Webpack, Rollup, esbuild
- 🚀 **Lightweight**: Zero dependencies, tiny bundle size
- 🔒 **Type-Safe**: Full TypeScript support
- 🧩 **Simple API**: Dot notation for nested keys, interpolation support
- 🔢 **Pluralization**: Supports both key-based (`_plural` suffix) and inline pluralization
- 🎨 **Rich Text**: Support for HTML/Rich Text interpolation

## Installation

```bash
npm install lite-i18n
```

## Usage

### Basic Usage

```typescript
import { createTranslator } from 'lite-i18n';

const translations = {
  en: {
    greeting: 'Hello, {{name}}!',
    messages: {
      unread: 'You have {{count}} unread messages'
    }
  },
  es: {
    greeting: '¡Hola, {{name}}!',
    messages: {
      unread: 'Tienes {{count}} mensajes no leídos'
    }
  }
};

const t = createTranslator('en', translations);

console.log(t('greeting', { name: 'Alice' })); // "Hello, Alice!"
console.log(t('messages.unread', { count: 5 })); // "You have 5 unread messages"

t.setLocale('es');
console.log(t('greeting', { name: 'Bob' })); // "¡Hola, Bob!"
```

### Pluralization

#### Key-based Pluralization
Automatically detects if a `count` variable is passed and looks for a `_plural` key.

```typescript
const translations = {
  en: {
    items: {
      cart: 'One item in cart',
      cart_plural: '{{count}} items in cart'
    }
  }
};

const t = createTranslator('en', translations);

t.t('items.cart', { count: 1 }); // "One item in cart"
t.t('items.cart', { count: 5 }); // "5 items in cart"
```

#### Inline Pluralization
Define plural forms directly in your code (useful for view-specific logic).

```typescript
const clicks = 2;
const text = t.plural(clicks, {
  one: 'You clicked once',
  other: 'You clicked {{count}} times',
  zero: 'No clicks yet' // Optional zero state
});
// "You clicked 2 times"
```

### HTML / Rich Text
You can pass HTML strings as variables to inject rich text.

```typescript
const translations = {
  en: {
    welcome: 'Welcome, <b>{{name}}</b>!'
  }
};
// ...
const html = t.t('welcome', { name: '<span class="user">Admin</span>' });
// "Welcome, <b><span class="user">Admin</span></b>!"
```

### Declarative Translation
You can automatically translate elements using `data-i18n` attributes.

```html
<h1 data-i18n="global.title"></h1>
<p data-i18n="messages.unread" data-i18n-vars='{"count": 5}'></p>

<!-- For HTML content (uses innerHTML) -->
<div data-i18n-html="html.welcome"></div>
```

```typescript
t.autoTranslate();
```

This method scans for `data-i18n` (sets `textContent`) and `data-i18n-html` (sets `innerHTML`), parsing optional `data-i18n-vars` (JSON).
