import { ComponentType } from "react";
import Header from "./Header";
import { Helmet } from "react-helmet-async";

const AppLayout = () => (WrappedComponent: ComponentType<any>) => {
  return (props: any) => {
    return (
      <div>
        <Helmet>
          <title>Convo</title>
          <meta name="description" content="Convo chat application main page" />
        </Helmet>

        <Header />
        
        <div className="flex h-[calc(100vh-32px)] w-full">
          <section className="w-[30%] bg-gray-50 border-r border-gray-200 hidden md:block">
            Chat List
          </section>
          <section className="flex-1 bg-white">
            <WrappedComponent {...props} />
          </section>


        </div>
      </div>
    );
  };
};
export default AppLayout;