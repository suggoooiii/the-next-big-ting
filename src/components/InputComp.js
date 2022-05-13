import {Input, useTheme, VStack} from "native-base";
import PropTypes from "prop-types";
import {memo} from "react";

function InputComp({header, value, onChangeText, ...props}) {
  const {colors} = useTheme();
  return (
    <VStack bg="warmGray.700" rounded="10" w="100%">
      <Input
        size="md"
        fontSize={20}
        mx="auto"
        my="auto"
        color="white"
        variant="unstyled"
        selectionColor={colors.primary.accent}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
    </VStack>
  );
}

InputComp.propTypes = {
  header: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChangeText: PropTypes.func,
};

export default memo(InputComp);
