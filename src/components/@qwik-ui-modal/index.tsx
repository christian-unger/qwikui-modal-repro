import {
    component$,
    Slot,
    type JSXOutput,
    type QRL,
    type Signal,
} from "@builder.io/qwik";
import { Modal } from "@qwik-ui/headless";

export const QwikUiModal = component$(
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
