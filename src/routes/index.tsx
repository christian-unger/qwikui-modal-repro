import {
    component$,
    JSXOutput,
    QRL,
    Signal,
    Slot,
    useSignal,
} from "@builder.io/qwik";
import { Modal } from "@qwik-ui/headless";

export default component$(() => {
    const isOpenSignal = useSignal(false);
    const inputTextSignal = useSignal("");
    return (
        <>
            <button
                onClick$={() => {
                    isOpenSignal.value = true;
                }}
            >
                Open Modal
            </button>
            <QwikUiModal
                title="Hello"
                isOpenSignal={isOpenSignal}
                closeOnBackdropClick={true}
            >
                <div>Modal content:</div>
                <input type="text" bind:value={inputTextSignal} />
                {Array.from({ length: 10 }, (_, i) => (
                    <div key={i}>Content {i}</div>
                ))}
            </QwikUiModal>
        </>
    );
});

const QwikUiModal = component$(
    (props: {
        isOpenSignal: Signal<boolean>;
        title: string | JSXOutput;
        description?: string | JSXOutput;
        closeOnBackdropClick?: boolean;
    }) => {
        return (
            <Modal.Root
                bind:show={props.isOpenSignal}
                closeOnBackdropClick={props.closeOnBackdropClick}
            >
                <Modal.Panel>
                    {props.isOpenSignal.value === true && (
                        <>
                            <header>
                                <Modal.Title>{props.title}</Modal.Title>
                                <button
                                    onClick$={() => {
                                        props.isOpenSignal.value = false;
                                    }}
                                >
                                    close
                                </button>
                                <Modal.Description>
                                    {props.description}
                                </Modal.Description>
                            </header>
                            <section>
                                <Slot />
                            </section>
                        </>
                    )}
                </Modal.Panel>
            </Modal.Root>
        );
    },
);
