const HeaderLabel = (props) => {
  return (
    <label className="w-[120px] flex items-center" key={props.value}>
      {props.value}
    </label>
  );
};

export default HeaderLabel;
