import {
  component$,
  useSignal,
  useStylesScoped$,
  Slot,
  useOnDocument,
  $,
  useTask$,
  type PropFunction,
} from '@builder.io/qwik';
import clsx from 'clsx';

export interface DialogProps {
  open: boolean;
  onOpenChange$?: PropFunction<(open: boolean) => void>;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnEsc?: boolean;
  closeOnOverlayClick?: boolean;
  blurAmount?: string;
  class?: string;
}

export default component$<DialogProps>((props) => {
  const {
    open,
    onOpenChange$,
    title,
    size = 'md',
    closeOnEsc = true,
    closeOnOverlayClick = true,
    blurAmount = '12px',
    class: className,
  } = props;

  const isOpen = useSignal(open);
  const dialogRef = useSignal<HTMLDialogElement>();

  useTask$(({ track }) => {
    const openState = track(() => open);
    isOpen.value = openState;

    const dialog = dialogRef.value;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    } else {
      dialog.close();
      document.body.style.overflow = '';
    }
  });

  const handleClose = $(() => {
    isOpen.value = false;

    onOpenChange$?.(false);
  });

  useStylesScoped$(`
    dialog {
      border: none;
      border-radius: 30px;
      padding: 0;
      max-height: 85vh;
      overflow-y: auto;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin: 0;
    }

    dialog[open] {
      display: flex;
      flex-direction: column;
    }

    .dialog-size-sm { max-width: 24rem; width: 90%; }
    .dialog-size-md { max-width: 32rem; width: 90%; }
    .dialog-size-lg { max-width: 48rem; width: 90%; }
    .dialog-size-xl { max-width: 64rem; width: 90%; }
  `);

  useOnDocument(
    'keydown',
    $((event: KeyboardEvent) => {
      if (closeOnEsc && event.key === 'Escape' && isOpen.value) {
        console.log('xx esc');

        handleClose();
      }
    }),
  );

  const handleBackdropClick$ = $((event: MouseEvent) => {
    console.log('xx handleBackdropClick');

    if (!closeOnOverlayClick) return;

    const dialog = dialogRef.value;
    if (!dialog) return;

    const rect = dialog.getBoundingClientRect();

    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    ) {
      console.log('xx handleBackdropClick handleClose');
      handleClose();
    }
  });

  return (
    <>
      {/* Backdrop */}
      <div
        class={`fixed inset-0 bg-black/50 ${isOpen.value ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity`}
        style={`backdrop-filter: blur(${blurAmount})`}
        // onClick$={handleClose}
      />
      <dialog
        ref={dialogRef}
        class={clsx(
          `dialog-size-${size} card-bg-gradient ${isOpen.value && 'flex justify-center items-center'} rounded-[30px] shadow-2xl focus:outline-none`,
          className,
        )}
        onClick$={handleBackdropClick$}
      >
        <div class="flex flex-col w-[calc(100%-2px)] rounded-[30px] mt-[1px] mb-[1px] bg-background">
          {title && (
            <div class="p-4 border-b border-neutral-70">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-medium text-neutral-10">{title}</h3>
                <button
                  type="button"
                  onClick$={handleClose}
                  class="text-neutral-60 hover:text-neutral-40 focus:outline-none focus:ring-2 focus:ring-primary rounded-full p-1"
                >
                  <span class="sr-only">Close</span>
                  <svg
                    class="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}

          <div class="p-4">
            <Slot />
          </div>

          {/* <div class="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-neutral-70">
          <Slot name="footer" />
        </div> */}
        </div>
      </dialog>
    </>
  );
});
