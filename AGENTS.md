<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the final expense landing page at `/`, with a dedicated browser-safe wizard component using URL hashes for the brief's question steps; this preserves phone Back navigation without duplicating content routes.
- Keep the first delivery presentation-only through question seven; contact submission and live pricing must be connected before exposing a working lead form or price.
- Define PolicyBear visual styles and role colors centrally in `src/styles.css`; controls use the shared Button and accessible radio primitives for consistent, readable interaction.
