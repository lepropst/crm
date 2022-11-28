import React from "react";
type DoesNotExistprops = {
  id: string;
  type: string;
};
export function DoesNotExist(props: DoesNotExistprops) {
  return (
    <div>
      Item of {props.type} and id {props.id} does not exist{" "}
    </div>
  );
}

export default DoesNotExist;
