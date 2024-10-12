type Propsmessage = {
  message: string;
};

export default function ErrorMessage({ message }: Propsmessage) {
  return <div>{message}</div>;
}
