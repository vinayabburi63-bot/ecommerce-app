import "./OrderTimeline.css";

const steps = ["Placed", "Shipped", "Delivered", "Returned"];

export default function OrderTimeline({ status }) {
  const activeIndex = steps.indexOf(status);

  return (
    <div className="timeline">
      {steps.map((step, i) => (
        <div key={step} className={`step ${i <= activeIndex ? "active" : ""}`}>
          <div className="dot" />
          <span>{step}</span>
        </div>
      ))}
    </div>
  );
}

