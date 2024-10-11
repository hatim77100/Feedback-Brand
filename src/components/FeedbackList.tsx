import { TriangleUpIcon } from "@radix-ui/react-icons";

export default function FeedbackList() {
  return (
    <ol className="feedback-list">
      <li className="feedback">
        <button>
          <TriangleUpIcon />
          <span>580</span>
        </button>
        <div>
          <p>B</p>
        </div>
        <div>
          <p>ByteHat</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
            architecto amet, sed nulla voluptas cumque?
          </p>
        </div>
        <p>4d</p>
      </li>
    </ol>
  );
}
