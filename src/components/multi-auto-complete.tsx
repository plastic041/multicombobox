import { useRef, useState } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import { Input } from "~/components/ui/input.tsx";

function match(str: string, substr: string) {
	return str.toLowerCase().includes(substr.toLowerCase());
}

function isInData(data: string[], value: string) {
	return data.some((option) => match(option, value));
}

/**
 * Current value at caret, from previous , to current caret position, trimmed
 * @example
 * Hello|, world! //  "Hello"
 * Hello, |world! //  ""
 * Hello, wor|ld! //  "wor"
 */
function getCurrentValueAtCaret(value: string, caret: number) {
	return (
		value
			.slice(0, caret) // from start to caret
			.split(",") // split by comma
			.pop() // get last item
			?.trim() ?? ""
	);
}

type MultiAutoCompleteProps = {
	data: string[];
	onChange: (value: string[]) => void;
	options?: {
		maxResults?: number;
	};
};
export function MultiAutoComplete({
	data,
	onChange,
	options: { maxResults = 5 } = {},
}: MultiAutoCompleteProps) {
	const [inputValue, setInputValue] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);

	const [selectedValue, setSelectedValue] = useState<string | null>(null);

	const currentValueAtCaret = getCurrentValueAtCaret(
		inputValue,
		inputRef.current?.selectionStart ?? 0,
	);

	const filtered =
		currentValueAtCaret.length === 0
			? []
			: data.filter((option) => match(option, currentValueAtCaret));

	function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
		const input = event.target.value;
		setInputValue(input);

		const currentValueAtCaret = getCurrentValueAtCaret(
			input,
			event.target.selectionStart ?? 0,
		);

		const filtered =
			currentValueAtCaret.length === 0
				? []
				: data.filter((option) => match(option, currentValueAtCaret));

		if (currentValueAtCaret) {
			if (filtered.length === 0) {
				setSelectedValue(null);
			} else {
				const first = filtered[0];
				setSelectedValue(first);
			}
		}

		// set value to all options that are in data
		// 1. split by comma
		const values = event.target.value.split(",").map((value) => value.trim());
		// 2. filter by isInData
		const filteredValues = values.filter((value) => isInData(data, value));
		// 3. set value
		onChange(filteredValues);
	}

	function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
		if (selectedValue) {
			switch (event.key) {
				case "ArrowDown": {
					event.preventDefault();
					const next = filtered.indexOf(selectedValue) + 1;
					setSelectedValue(filtered[next]);
					break;
				}
				case "ArrowUp": {
					event.preventDefault();
					const next = filtered.indexOf(selectedValue) - 1;
					setSelectedValue(filtered[next]);
					break;
				}
				case "Tab":
				case "Enter": {
					event.preventDefault();
					if (selectedValue) {
						setInputValue(
							inputValue.replace(currentValueAtCaret, selectedValue),
						);
						setSelectedValue("");
						inputRef.current?.focus();
					}
					break;
				}
			}
		}
	}

	return (
		<div className="grid grid-cols-2 gap-4">
			<div className="flex flex-col relative col-span-1">
				<Input
					ref={inputRef}
					type="text"
					value={inputValue}
					onKeyDown={handleKeyDown}
					onChange={handleInputChange}
				/>
				<ul className="absolute top-full left-0 w-full">
					{filtered.slice(0, maxResults).map((option) => {
						return (
							<li
								key={option}
								className="border data-[selected='true']:bg-blue-400"
								data-selected={option === selectedValue}
							>
								{option}
							</li>
						);
					})}
				</ul>
			</div>
			<div>
				<h1>Value</h1>
				<pre>{JSON.stringify(currentValueAtCaret, null, 2)}</pre>
				<h1>Selected</h1>
				<pre>{JSON.stringify(selectedValue, null, 2)}</pre>
				<h1>Filtered</h1>
				<pre>{JSON.stringify(filtered, null, 2)}</pre>
				<h1>Input Value</h1>
				<pre>{JSON.stringify(inputValue, null, 2)}</pre>
			</div>
		</div>
	);
}
