const RotatedText = ({children}) => {
    return (
      <span className="relative whitespace-nowrap">
        <span className="absolute bg-[#5f58e2]  -left-2 -top-1 -bottom-1 -right-2 md:-left-3 md:-top-0 md:-right-3 -rotate-1 mx-2" aria-hidden="true"/>
        <span className="relative uppercase">
          {children}
        </span>
  
      </span>
    )
  }
  
  export default RotatedText