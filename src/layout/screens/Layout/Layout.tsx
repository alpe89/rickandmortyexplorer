import { FC, ReactNode } from "react";
import { Header } from "../../components";

type Props = { children: ReactNode };

export const Layout: FC<Props> = ({ children }) => (
    <>
        <Header />
        {children}
    </>
);
