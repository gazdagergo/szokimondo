const Emoji = ({ emoji }) => {
  return <div style={{ padding: 50, fontSize: 300 }}>{emoji}</div>
}

export default Emoji

export const getServerSideProps = async ({ query }) => {
  
  return {
    props: {
      emoji: query.emoji
    }
  }
}
