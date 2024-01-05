import { defineConfig } from "unocss";

export default defineConfig({
	theme: {
		colors: {
			background: "hsl(0 0% 100%)",
			foreground: "hsl(222.2 47.4% 11.2%)",
			muted: "hsl(210 40% 96.1%)",
			mutedForeground: "hsl(215.4 16.3% 46.9%)",
			input: "hsl(214.3 31.8% 91.4%)",
			border: "hsl(214.3 31.8% 91.4%)",
			ring: "hsl(215 20.2% 65.1%)",
		},
	},
	preflights: [
		{
			getCSS: ({ theme }) => `
				* {
					--un-border-opacity: 1;
					border-color: hsl(214.3 31.8% 91.4% / var(--un-border-opacity));
				}
				body {
					background-color: ${theme.colors.background};
					color: ${theme.colors.foreground};
					font-feature-settings: "rlig" 1, "calt" 1;
				}
			`,
		},
	],
});
