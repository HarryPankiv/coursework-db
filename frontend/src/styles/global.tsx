import { createGlobalStyle } from "styled-components";
import { neutrals } from "./colors";

export const font = "'Lato',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen, Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif;"

export default createGlobalStyle`
	#root {
		width: 80%;
    	margin: auto;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	p {
		font-family: ${font};
		font-weight: 500;
		line-height: 1.25;
		margin-top: 1em;
		margin-bottom: 0.5em;
		font-variant: small-caps;
		color: ${neutrals["neutrals-1"]};
	}

	h4, h5, h6, p {
		color: ${neutrals["neutrals-2"]};
	}

	h1 {
		font-size: 24px;
		line-height: 40px;
		font-weight: 800;
		margin-top: 1rem;
		margin-bottom: 8px;
	}
	h2 {
		font-size: 20px;
		line-height: 32px;
		font-weight: 700;
		margin-top: 1rem;
		margin-bottom: 8px;
	}
	h3 {
		font-size: 18px;
		line-height: 28px;
		font-weight: 700;
		margin-top: 1rem;
		margin-bottom: 8px;
	}
	h4 {
		font-size: 16px;
		line-height: 20px;
		font-weight: 700;
		margin-top: 1rem;
		margin-bottom: 8px;
		text-transform: lowercase;
	}
	h5, button {
		font-size: 14px;
		line-height: 20px;
		font-weight: 700;
		margin-top: 1rem;
		margin-bottom: 8px;
		text-transform: lowercase;
	}
	h6 {
		font-size: 12px;
		line-height: 16px;
		font-weight: 700;
		margin-top: 1rem;
		margin-bottom: 8px;
		text-transform: lowercase;
	}
	p {
		font-size: 14px;
		line-height: 18px;
		font-weight: 700;
		margin-top: 1rem;
		margin-bottom: 8px;
	}
	a {
		font-variant: small-caps;
		font-family: ${font};
		font-weight: 500;
		color: ${neutrals["neutrals-1"]}
	}
`;
