// The droppable from react-beautiful-dnd breaks when react.strictmode is enabled
// This is a workaround for that, but won't be needed outside of development

import { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
export const StrictModeDroppable = ({ children, ...props }) => {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);
  if (!enabled) {
    return null;
  }
  return <Droppable {...props}>{children}</Droppable>;
};