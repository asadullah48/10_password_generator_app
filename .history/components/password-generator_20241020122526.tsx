"use client";

import { useState, ChangeEvent } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export default function GeneratePasswordComponent() {
  const [length, setLength] = useState<number>(16);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");

  const handleLengthChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setLength(Number(e.target.value));
  };

  const generatePassword = (): void => {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

    let allChars = "";
    if (includeUppercase) allChars += uppercaseChars;
    if (includeLowercase) allChars += lowercaseChars;
    if (includeNumbers) allChars += numberChars;
    if (includeSymbols) allChars += symbolChars;

    if (allChars === "") {
      alert("Please select at least one character type.");
      return;
    }

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      generatedPassword += allChars[randomIndex];
    }
    setPassword(generatedPassword);
  };

  const copyToClipboard = (): void => {
    navigator.clipboard.writeText(password).then(
      () => alert("Password copied to clipboard!"),
      () => alert("Failed to copy password.")
    );
  };

  const handleCheckboxChange =
    (setter: (value: boolean) => void) =>
    (checked: boolean | "indeterminate"): void => {
      setter(checked !== "indeterminate" && checked);
    };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500">
      <Card className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow-2xl rounded-xl border-4 border-blue-300">
        <div className="mx-auto max-w-md space-y-6">
          <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Password</span>
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
    {" "}
    Generator
  </span>
</CardTitle>

            <CardDescription className="text-gray-500 dark:text-gray-400 text-center">
              Secure passwords in just a click!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="length" className="text-blue-600">Password Length</Label>
              <Input
                id="length"
                type="number"
                min="8"
                max="50"
                value={length}
                onChange={handleLengthChange}
                className="w-full border-2 border-purple-500"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-blue-600">Include:</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="uppercase"
                  checked={includeUppercase}
                  onCheckedChange={handleCheckboxChange(setIncludeUppercase)}
                />
                <Label htmlFor="uppercase">Uppercase Letters</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lowercase"
                  checked={includeLowercase}
                  onCheckedChange={handleCheckboxChange(setIncludeLowercase)}
                />
                <Label htmlFor="lowercase">Lowercase Letters</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="numbers"
                  checked={includeNumbers}
                  onCheckedChange={handleCheckboxChange(setIncludeNumbers)}
                />
                <Label htmlFor="numbers">Numbers</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="symbols"
                  checked={includeSymbols}
                  onCheckedChange={handleCheckboxChange(setIncludeSymbols)}
                />
                <Label htmlFor="symbols">Symbols</Label>
              </div>
            </div>
            <Button
  type="button"
  className="w-full bg-gradient-to-r from-blue-600 to-pink-500 hover:from-blue-700 hover:via-purple-600 hover:to-pink-600 text-white py-2 rounded-lg"
  onClick={generatePassword}
>
  Generate Password
</Button>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-blue-600">Generated Password</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="password"
                  type="text"
                  value={password}
                  readOnly
                  className="flex-1 border-2 border-purple-500"
                />
                <Button
                  type="button"
                  className="bg-purple-500 hover:bg-purple-600 text-white rounded-lg"
                  onClick={copyToClipboard}
                >
                  Copy
                </Button>
              </div>
            </div>
          </CardContent>
        </div>
        <CardFooter className="flex justify-center mt-4">
  <p className="text-sm text-gray-400 dark:text-gray-400 font-semibold mb-0">
    Created by Asadullah Shafique
  </p>
</CardFooter>

      </Card>
      
    </div>
    
  );

}