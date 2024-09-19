const UnderlinedText = ({children}) => {
    return (
      <span className={("underline underline-offset-4 decoration-dashed decoration-sky-400")}>
        {children}
      </span>
    )
  }
  
  export default UnderlinedText