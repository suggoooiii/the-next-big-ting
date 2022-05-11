/* eslint-disable react/prop-types */
import {forwardRef} from "react";
import {useStyledSystemPropsResolver} from "native-base";

export function makeStyledComponent(Comp) {
  return forwardRef((props, ref) => {
    const [style, restProps] = useStyledSystemPropsResolver(props);
    return (
      <Comp {...restProps} style={style} ref={ref}>
        {props.children}
      </Comp>
    );
  });
}
