import React from "react";
import { ReactNode } from "react";
import Card from "../../components/Card";
import Footer from "../../components/Footer";

// Component is used to display card like information (i..e, texts etc.)
const About: React.FC = () => {
    return(
        <div className="flex-col">
        <Card>
          <h1 className="text-xl font-semibold mb-2"> About Us: Green Queen</h1>
          <p className="flex flex-col item-start space-y-2">
            <span><span className="mr-2">⚝</span><i>binfluence</i> is a product from GreenQueen, a business dedicated to helping to reduce waste in our environment.</span>
            <span><span className="mr-2">⚝</span>We want to make it easier for people to understand recycling as well as learning about options to divert waste from your bins.</span>
            <span><span className="mr-2">⚝</span>We want to influence your bins (binfluence, get it?!) - sharing information and education to get people closer to zero waste.</span>
          </p>
        </Card>
        <Footer parentHeight={0}/>
        </div>
    )
}

export default About;