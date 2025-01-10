import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { QwikUiModal } from "~/components/@qwik-ui-modal";

export default component$(() => {
    const notConditionallyRenderedIsOpenSignal = useSignal(false);
    const conditionallyRenderedIsOpenSignal = useSignal(false);
    return (
        <main>
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
        </main>
    );
});

export const head: DocumentHead = {
    title: "Welcome to Qwik",
    meta: [
        {
            name: "description",
            content: "Qwik site description",
        },
    ],
};
