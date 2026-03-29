import component from "@/interfaces/component";

export default function createComponent(
  destinationQuery: string,
  component: React.JSX.Element,
): component {
  return { destinationQuery, component };
}
