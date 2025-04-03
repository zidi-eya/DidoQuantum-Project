import { useQuasar } from 'quasar';
import { useClipboard as vueUseClipboard } from '@vueuse/core';

export function useClipboard() {
  const { copy } = vueUseClipboard();
  const $q = useQuasar();

  function copyToClipboard(text: string, removeTextMarkdown = true) {
    if (removeTextMarkdown) {
      copy(removeMarkdown(text));
    } else {
      copy(text);
    }
    $q.notify({
      message: 'Copied to clipboard',
      color: 'primary',
      position: 'bottom',
      timeout: 1000,
    });
  }

  // Not fully supported by all browsers
  // See: https://caniuse.com/clipboard
  async function copyImageToClipboard(blob: Blob | undefined) {
    if (blob) {
      try {
        await navigator.clipboard.write([
          new ClipboardItem({
            [blob.type]: blob,
          }),
        ]);
        $q.notify({
          message: 'Copied to clipboard',
          color: 'primary',
          position: 'bottom',
          timeout: 1000,
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  function removeMarkdown(mdText: string) {
    // Remove headers
    mdText = mdText.replace(/(#+\s)/g, '');
    // Remove bold, italic, and strikethrough texts
    mdText = mdText.replace(/(\*\*|__|\*|_|~~)/g, '');
    // Remove inline links and images
    mdText = mdText.replace(/!\[.*?\]\(.*?\)/g, ''); // Remove images
    mdText = mdText.replace(/\[.*?\]\(.*?\)/g, ''); // Remove links
    // Remove blockquotes
    mdText = mdText.replace(/(>\s)/g, '');
    // Remove inline code and code blocks
    mdText = mdText.replace(/(```.*?```|`)/gs, '');
    // Remove lists
    mdText = mdText.replace(/^(\s*(\-|\*|\+|\d+\.)\s)/gm, '');
    // Remove horizontal rules
    mdText = mdText.replace(/(\n-{3,}\n)/g, '');

    return mdText;
  }

  return { copyToClipboard, copyImageToClipboard };
}
