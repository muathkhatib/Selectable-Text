import { ISelectedText } from "@/types";
import Button from "@/components/common/Button";
import styles from "./styles";

interface TranslateResultModalProps {
  selectedText: ISelectedText;
}

const TranslationPopup = ({ selectedText }: TranslateResultModalProps) => {
  return (
    <div
      style={{
        ...styles.popupContainer,
        top: selectedText.position?.top + 54 ?? 0, // Adjust this value based on your desired position, (54) to show it under selectedText value
        left: selectedText.position?.left ?? 0,
      }}
    >
      <h4>{selectedText.originalText}</h4>
      <Button title="Known" />
      <Button title="Unknown" />
      <p>{selectedText.translateResult}</p>
    </div>
  );
};

export default TranslationPopup;
