# SelectableText Component

The `SelectableText` component is a React component that allows users to select and interact with individual words within a given text. It provides a user-friendly interface to highlight words, get translations, and take actions on selected words.

## Features

- Click on a word to highlight it.
- Display translations for the selected word.
- Users can mark a word as known or unknown.

## Installation

To use the `SelectableText` component in your React project, follow these steps:

1. Install the required dependencies:

```bash
yarn install
```

## Usage

To use the `SelectableText` component, follow these steps:

1. Import the component:

```jsx
import SelectableText from "@/components/SelectableText";
```

2. Use the component in your JSX code:

```jsx
const includedWords = ["word1", "word2", "word3"]; // List of words to be highlighted
const text = "This is a sample text with words that can be selected.";

function App() {
  return (
    <div>
      <h1>Selectable Text Example</h1>
      <SelectableText includedWords={includedWords}>{text}</SelectableText>
    </div>
  );
}
```

## Props

The `SelectableText` component accepts the following props:

- `includedWords` (required): An array of strings representing the words that should be highlighted in the text.
- `children` (required): The text content that will be displayed with selectable words.

## Styling

You can customize the appearance of the highlighted words and the translation result popup by modifying the relevant CSS properties in the `renderHighlightedText` function and the popup's style, respectively.

## Translation API

The component uses the `getTranslation` function from the `@/api/getTranslation` module to fetch translations for the selected word. Ensure that you have implemented the translation API and replace the import statement with the correct path to your API module.

## Enviroment Variables

create `.env` file in the root to setup the environment variables

```
VITE_GOOGLE_API_KEY= google_api_key_here
```

## Note

- This component assumes that the `getTranslation` function returns a translation object with the following shape:

```typescript
type TranslationResult = {
  source: string;
  target: string;
  translateResult: string;
  originalText: string;
  position: { top: number; left: number };
};
```

- The positioning of the translation result popup is dynamically calculated to appear on top of the selected word. However, if the parent container is transformed or has complex CSS layout, additional adjustments might be needed.

- The component relies on the `window.getSelection()` method to detect user selections. It may not work as expected on touch devices or in certain scenarios with custom text input components.
