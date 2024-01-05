import { useState } from "react";
import { MultiAutoComplete } from "~/components/multi-auto-complete.tsx";

const OPTIONS = [
	"Apple",
	"Banana",
	"Orange",
	"Strawberry",
	"Watermelon",
	"Cherry",
	"Kiwi",
	"Blueberry",
	"Raspberry",
	"Blackberry",
	"Melon",
	"Pineapple",
	"Coconut",
	"Avocado",
	"Papaya",
	"Mango",
	"Plum",
	"Peach",
	"Pear",
	"Apricot",
	"Grape",
	"Lemon",
	"Lime",
];

export function App() {
	const [value, setValue] = useState<string[]>([]);

	return (
		<div className="flex items-center justify-center h-screen w-screen">
			<MultiAutoComplete data={OPTIONS} onChange={setValue} />
		</div>
	);
}

export default App;
