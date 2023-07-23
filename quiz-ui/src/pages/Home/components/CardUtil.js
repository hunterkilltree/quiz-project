import PropTypes from 'prop-types';

const CardUtil = ({ title, content, image }) => {
  return (
    <>
      <div>fasas</div>
      <div>{title}</div>
      <div>{content}</div>
      <div>{image}</div>
    </>
  );
};

CardUtil.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

export default CardUtil;
