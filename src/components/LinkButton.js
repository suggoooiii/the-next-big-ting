import React, {useCallback} from "react"
import * as Linking from "expo-linking"
import {Button, IButtonProps} from "native-base"

const LinkButton = ({href, ...props}) => {
  const handlePress = useCallback(() => {
    Linking.openURL(href)
  }, [href])

  return <Button {...props} onPress={handlePress} />
}

export default LinkButton
