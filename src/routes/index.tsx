import {
    component$,
    JSXOutput,
    QRL,
    Signal,
    Slot,
    useSignal,
} from "@builder.io/qwik";
import { Modal } from "@qwik-ui/headless";

/**
 * Example:
 * - Modal works as intended when not conditionally rendered.
 * - Modal does not work when conditionally rendered.
 *
 * - Minimal version of our component included below for reference.
 */

export default component$(() => {
    const notConditionallyRenderedIsOpenSignal = useSignal(false);
    const conditionallyRenderedIsOpenSignal = useSignal(false);
    return (
        <>
            {/* Not Conditionally Rendered: */}

            <button
                onClick$={() => {
                    notConditionallyRenderedIsOpenSignal.value = true;
                }}
            >
                Open Modal (Not Conditionally Rendered)
            </button>
            <QwikUiModal
                title="Hello"
                isOpenSignal={notConditionallyRenderedIsOpenSignal}
                closeOnBackdropClick={true}
            >
                <div>Modal content:</div>
                {Array.from({ length: 10 }, (_, i) => (
                    <div key={i}>Content {i}</div>
                ))}
            </QwikUiModal>

            <br />
            <br />
            <br />

            {/* Conditionally Rendered: */}

            <button
                onClick$={() => {
                    conditionallyRenderedIsOpenSignal.value = true;
                }}
            >
                Open Modal (Conditionally Rendered)
            </button>
            {conditionallyRenderedIsOpenSignal.value === true && (
                <QwikUiModal
                    title="Hello"
                    isOpenSignal={conditionallyRenderedIsOpenSignal}
                    closeOnBackdropClick={true}
                >
                    <div>Modal content:</div>
                    {Array.from({ length: 10 }, (_, i) => (
                        <div key={i}>Content {i}</div>
                    ))}
                </QwikUiModal>
            )}
        </>
    );
});

const QwikUiModal = component$(
    (props: {
        title: string | JSXOutput;
        isOpenSignal: Signal<boolean>;
        description?: string | JSXOutput;
        onClickClose$?: QRL<() => void>;
        onClickOutside$?: QRL<() => void>;
        closeOnBackdropClick?: boolean;
    }) => {
        return (
            <Modal.Root
                bind:show={props.isOpenSignal}
                closeOnBackdropClick={props.closeOnBackdropClick}
            >
                <Modal.Panel>
                    <header>
                        <div>
                            <Modal.Title>{props.title}</Modal.Title>
                            <button
                                class="unstyled"
                                autoFocus={false}
                                onClick$={() => {
                                    props.onClickClose$?.();
                                    props.isOpenSignal.value = false;
                                }}
                            >
                                ✕
                            </button>
                        </div>
                        {props.description && (
                            <Modal.Description>
                                {props.description}
                            </Modal.Description>
                        )}
                    </header>
                    <section>
                        <Slot />
                    </section>
                </Modal.Panel>
            </Modal.Root>
        );
    },
);
