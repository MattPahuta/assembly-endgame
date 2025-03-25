import { getFarewellText } from "../utils";

function StatusBanner({lostLanguage}) {
  return (
    <>
      <p>{getFarewellText(lostLanguage)}</p>
    </>
  )
}

export default StatusBanner;