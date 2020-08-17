import React, { FC } from "react";
import { connect, useConnect, useFills } from "frontity";
import SlotAndFill from "../types";

const Root: FC = connect(() => {
  const { actions } = useConnect<SlotAndFill>();
  const fills1 = useFills("slot 1");
  const fills2 = useFills("slot 2");

  return (
    <>
      <div id="useFills-slot1">
        {fills1.length > 0 ? (
          fills1.map(({ Fill, key, props }) => <Fill key={key} {...props} />)
        ) : (
          <div id="useFills-slot1-empty">useFills slot 1 empty</div>
        )}
      </div>
      <hr />
      <div id="useFills-slot2">
        {fills2.length > 0 ? (
          fills2.map(({ Fill, key, props }) => <Fill key={key} {...props} />)
        ) : (
          <div id="useFills-slot2-empty">useFills slot 2 empty</div>
        )}
      </div>
      <hr />
      <button id="addFill1" onClick={actions.slotAndFill.addFill1}>
        Add Fill1
      </button>
      <button id="addFill2" onClick={actions.slotAndFill.addFill2}>
        Add Fill2
      </button>
      <button id="toggleDebug" onClick={actions.slotAndFill.toggleDebug}>
        Toggle Debug
      </button>
    </>
  );
});

/**
 * The props of the {@link Fill1} and {@link Fill2} components.
 */
interface FillProps {
  /**
   * Some text that will be rendered by the component.
   */
  text: string;
}

/**
 * A Fill component that renders some text and has some id.
 *
 * @param props - The props of the component, defined by {@link FillProps}.
 *
 * @returns A div tag with some text.
 */
const Fill1: FC<FillProps> = ({ text }) => <div id="Fill1">{text}</div>;

/**
 * A Fill component that renders some text and has some id.
 *
 * @param props - The props of the component, defined by {@link FillProps}.
 *
 * @returns A div tag with some text.
 */
const Fill2: FC<FillProps> = ({ text }) => <div id="Fill2">{text}</div>;

const slotAndFill: SlotAndFill = {
  state: {
    fills: {
      slotAndFill: {},
    },
  },
  actions: {
    slotAndFill: {
      addFill1: ({ state }) => {
        state.fills.slotAndFill.fill1 = {
          slot: "slot 1",
          library: "slotAndFill.Fill1",
          props: {
            text: "I am Fill1",
          },
        };
      },
      addFill2: ({ state }) => {
        state.fills.slotAndFill.fill2 = {
          slot: "slot 1",
          library: "slotAndFill.Fill2",
          props: {
            text: "I am Fill2",
          },
          priority: 9,
        };
      },
      toggleDebug: ({ state }) => {
        state.frontity.debug = !state.frontity.debug;
      },
    },
  },
  roots: {
    slotAndFill: Root,
  },
  libraries: {
    fills: {
      slotAndFill: {
        Fill1,
        Fill2,
      },
    },
  },
};

export default slotAndFill;
