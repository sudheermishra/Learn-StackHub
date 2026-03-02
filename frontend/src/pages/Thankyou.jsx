import { Link } from "react-router-dom";

// function Thankyou() {
//   return (
//     <div>
//       <h1>thank you for purchasing the course.</h1>
//       <h2>
//         You can see the course in
//         <Link to={"/mycourses"}>My courses page</Link>
//       </h2>
//     </div>
//   );
// }

function Thankyou() {
  return (
    <div
      style={{
        maxWidth: "520px",
        margin: "6rem auto",
        padding: "0 1rem",
        textAlign: "center",
      }}>
      <div
        style={{
          fontSize: "4rem",
          marginBottom: "1.5rem",
        }}>
        🎉
      </div>

      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "2rem",
          fontWeight: "800",
          letterSpacing: "-0.02em",
          marginBottom: "1rem",
        }}>
        You're enrolled!
      </h1>

      <p
        style={{
          color: "var(--text-muted)",
          fontSize: "1rem",
          lineHeight: "1.7",
          marginBottom: "2.5rem",
        }}>
        Thank you for your purchase. Your course is ready and waiting for you.
      </p>

      <Link
        to="/mycourses"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          background: "var(--accent)",
          color: "#0C0F1E",
          fontFamily: "var(--font-display)",
          fontWeight: "700",
          fontSize: "0.95rem",
          padding: "0.85rem 2rem",
          borderRadius: "10px",
          textDecoration: "none",
          letterSpacing: "0.02em",
          boxShadow: "0 4px 20px rgba(232, 169, 77, 0.3)",
        }}>
        Go to My Courses →
      </Link>
    </div>
  );
}

export default Thankyou;
