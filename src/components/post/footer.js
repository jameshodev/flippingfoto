import PropTypes from 'prop-types';

function Footer({ caption, username }) {
  return (
    <div className="p-4 pt-2 pb-1">
      {/* add space after username */}
      <span className="mr-1 font-bold">{`${username} `}</span>
      <span className="italic">{caption}</span>
    </div>
  );
}

export default Footer;

Footer.propTypes = {
  caption: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
