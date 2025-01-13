import FAQSection from "./FaqSection";
import CarInquiryForm from "./FirstSection";
import ImageSection from "./Section";
import WhySbx from "./WhyCarBuyDirect";

export default function SellingPage(){
    return(
        <div>
            <CarInquiryForm/>
            <ImageSection/>
            <WhySbx/>
            <FAQSection/>
        </div>
    )
}