import React from "react";
import { useLogin } from "./useLogin";
import { Input, InputField } from "../../components/ui/input";
import { Box } from "../../components/ui/box";
import { Text } from "../../components/ui/text";
import { Button, ButtonText } from "../../components/ui/button";

export default function LoginScreen({ navigation }: any) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    handleLogin,
  } = useLogin(navigation);

  return (
    <Box className="flex-1 justify-center items-center p-4 bg-backgroundLight0">
      {error && <Text className="text-error mb-3">{error}</Text>}

      {/* Input de Email */}
      <Input variant="outline" size="md" className="w-full">
        <InputField
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </Input>

      <Box>
        {/* Input de Senha */}
        <Input variant="outline" size="md" className="w-full mt-3">
          <InputField
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </Input>
      </Box>

      <Box>
        <Button
          size="md"
          variant="solid"
          onPress={handleLogin}
          isDisabled={loading}
          className="w-full mt-4 justify-center"
        >
          <ButtonText>{loading ? "Carregando..." : "Entrar"}</ButtonText>
        </Button>
      </Box>
    </Box>
  );
}
