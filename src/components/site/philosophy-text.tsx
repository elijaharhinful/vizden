"use client";

import { useState } from "react";

// Philosophy copy. On mobile the body collapses after "No more." behind a
// read-more toggle; on sm+ the full passage always renders.
export function PhilosophyText() {
  const [expanded, setExpanded] = useState(false);

  return (
    <p className="mt-8 font-display leading-snug sm:text-2xl">
      Ideas are not born equal. Some are cute bunnies, and others, raging dragons.
      For a century, the gatekeepers forced us to play safe because we couldn’t
      afford to feed the beasts. No more.{" "}
      <span className={expanded ? "inline" : "hidden sm:inline"}>
        The cloud has melted our chains. AI has supercharged our talents,
        crowning us absolute rulers of our own imagination. The concepts that
        used to terrify traditional studios into submission are the very ones we
        ride into battle. We have embraced our sovereignty. We tame the beasts.{" "}
        <br />
        <span className="text-brand font-semibold">
          Welcome to the Den. Today, we ride the lion.
        </span>
      </span>
      {!expanded ? (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="ml-1 inline font-display text-base text-brand underline underline-offset-4 transition-colors hover:text-brand/80 sm:hidden"
        >
          Read more
        </button>
      ) : null}
    </p>
  );
}
