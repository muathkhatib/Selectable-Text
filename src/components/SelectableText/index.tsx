import React, { useState, useRef, useCallback } from "react";
import he from "he";
import { getTranslation } from "@/api/getTranslation";
import { ISelectedText } from "@/types";
import TranslationPopup from "@/components/TranslationPopup";

import styles from "./styles";

interface SelectableTextProps {
  includedWords: string[];
  children: string;
}

const SelectableText: React.FC<SelectableTextProps> = ({
  includedWords,
  children,
}) => {
  const decodedChildren = useRef(he.decode(children));
  const [selectedText, setSelectedText] = useState<ISelectedText>({
    source: "",
    target: "",
    translateResult: "",
    originalText: "",
    position: { top: 0, left: 0 },
  });

  const parentRef = useRef<HTMLDivElement | null>(null);

  const handleSelectionText = useCallback(
    async ({ target }: React.MouseEvent<HTMLDivElement>) => {
      try {
        const selected = window.getSelection()?.toString();
        const clickedWord = target as HTMLElement;
        let clickedWordText = clickedWord.innerText.trim();

        if (selected) clickedWordText = selected;
        if (clickedWordText) {
          const cleanedWord = clickedWordText.replace(/['",.!?]/g, ""); // Clean the word from sympols Example: 'You -> You
          const translation = await getTranslation(cleanedWord, "tr");

          // Calculate the position of the clicked word relative to the parent div
          const parentRect = parentRef.current?.getBoundingClientRect();
          const clickedWordRect = clickedWord.getBoundingClientRect();

          const topOffset = clickedWordRect.top - Number(parentRect?.top);
          const leftOffset = clickedWordRect.left - Number(parentRect?.left);

          setSelectedText((prevState) => ({
            ...prevState,
            ...translation,
            position: { top: topOffset, left: leftOffset },
          }));
        }
      } catch (error) {
        console.log("Error", error);
      }
    },
    []
  );

  const renderHighlightedText = () => {
    const words = decodedChildren.current.split(" ");
    return words.map((word, index) => {
      const isWordIncluded = includedWords.includes(word);

      const combinedStyle: React.CSSProperties = {
        ...styles.highlightStyle,
        background: isWordIncluded
          ? "#83F9F9"
          : selectedText?.originalText === word
          ? styles.selectedStyle.background
          : "transparent",
        color:
          selectedText?.originalText === word
            ? styles.selectedStyle.color
            : "inherit",
      };

      return (
        <span key={index} onClick={handleSelectionText} style={combinedStyle}>
          {word}{" "}
        </span>
      );
    });
  };

  return (
    <>
      <div
        ref={parentRef}
        onClick={handleSelectionText}
        style={styles.container}
      >
        {renderHighlightedText()}
      </div>
      {selectedText?.translateResult && (
        <TranslationPopup selectedText={selectedText} />
      )}
    </>
  );
};

export default SelectableText;
