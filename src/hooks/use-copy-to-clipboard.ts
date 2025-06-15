import { useMemo, useState, useCallback } from 'react';

// ----------------------------------------------------------------------

export type UseCopyToClipboardReturn = {
  copy: CopyFn;
  copiedText: CopiedValue;
};

export type CopiedValue = string | null;

export type CopyFn = (text: string) => Promise<boolean>;

export function useCopyToClipboard(): UseCopyToClipboardReturn {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);

  const copy: CopyFn = useCallback(
    async (text) => {
      // Try modern clipboard API first
      if (navigator?.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(text);
          setCopiedText(text);
          return true;
        } catch (error) {
          console.warn('Modern clipboard API failed, trying fallback', error);
        }
      }

      // Fallback for older browsers or non-secure contexts
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;

        // Ensure the textarea is not visible
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        textArea.style.opacity = '0';
        textArea.style.pointerEvents = 'none';

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);

        if (successful) {
          setCopiedText(text);
          return true;
        }
        console.warn('Fallback copy method failed');
        setCopiedText(null);
        return false;
      } catch (error) {
        console.warn('All copy methods failed', error);
        setCopiedText(null);
        return false;
      }
    },
    [setCopiedText]
  );

  const memoizedValue = useMemo(() => ({ copy, copiedText }), [copy, copiedText]);

  return memoizedValue;
}
