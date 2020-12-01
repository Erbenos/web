import { Link } from 'components/links/link/styles'
import rgba from 'polished/lib/color/rgba'
import styled from 'styled-components'

// based on https://github.com/limitlessloop/flex-gap-polyfill
const flexGapPolyfill = (gap: number): string => `
  --fgp-gap-container: calc(var(--fgp-gap-parent, 0px) - ${gap}px) !important;
  --fgp-gap: var(--fgp-gap-container);
  margin-top: var(--fgp-gap);
  margin-right: var(--fgp-gap);
  > * {
    --fgp-gap-parent: ${gap}px !important;
    --fgp-gap-item: ${gap}px !important;
    --fgp-gap: var(--fgp-gap-item) !important;
    margin-top: var(--fgp-gap);
    margin-right: var(--fgp-gap);
  }
`

export const Outer = styled.div`
  margin: 0 auto;
  padding: ${(props) => props.theme.space.xl}px
    ${(props) => props.theme.space.md}px ${(props) => props.theme.space.lg}px
    ${(props) => props.theme.space.md}px;
  max-width: ${(props) => props.theme.contentSize}px;
  box-sizing: content-box;
`

export const Container = styled.section`
  margin: ${(props) => props.theme.space.base}px auto
    ${(props) => props.theme.space.base}px 0;
  max-width: calc(100% - 76px);
  color: ${(props) => props.theme.colors.white};

  background-image: url('assets/czechia-map-arrows.png');
  background-repeat: no-repeat;
  background-position: left ${(props) => props.theme.space.md}px bottom -${(props) => props.theme.space.lg}px;
  background-size: 608px 336px;

  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    background-image: url('assets/czechia-map-arrows@2x.png');
  }

  display: grid;
  grid-gap: ${(props) => props.theme.space.lg}px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: minmax(460px, auto) auto;
  grid-template-areas:
    'info newsletter'
    'info note';

  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    padding: ${(props) => props.theme.space.lg}px;
    max-width: 100%;

    background-position: bottom ${(props) => props.theme.space.xl}px right -${(props) => props.theme.space.xl}px;

    grid-template-rows: auto;
    grid-template-columns: auto;
    grid-template-areas: 'info' 'newsletter' 'note';
  }
`

export const Info = styled.section`
  grid-area: info;

  display: flex;
  ${(props) => flexGapPolyfill(props.theme.space.lg)}
  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    flex-direction: column;
    ${(props) => flexGapPolyfill(props.theme.space.md)}
  }
`

export const InfoBlock = styled.div`
  flex: 1;
`

export const Newsletter = styled.section`
  grid-area: newsletter;

  background-image: url('assets/footer-mail.svg');
  background-position: top right;
  background-repeat: no-repeat;

  @media (min-width: ${(props) =>
      props.theme.breakpoints.md}) and (max-width: ${(props) =>
      props.theme.breakpoints.lg}) {
    background-image: none;
  }
`

export const NewsletterInfo = styled.strong`
  max-width: 480px;
  display: inline-block;
  font-size: ${(props) => props.theme.fontSizes.xl}px;
  line-height: ${(props) => props.theme.lineHeights.heading};
  margin-bottom: ${(props) => props.theme.space.lg}px;
`

export const NewsletterForm = styled.form`
  display: flex;
`

export const NewsletterInput = styled.input`
  width: 100%;
  max-width: 316px;
  background: #2d2d50;
  border: 0;
  border-radius: ${(props) => props.theme.borderRadius.base}px;
  padding: ${(props) => props.theme.space.base * 1.5}px
    ${(props) => props.theme.space.base * 2.5}px;
  color: ${(props) => rgba(props.theme.colors.white, 0.8)};
  font-size: ${(props) => props.theme.fontSizes.base}px;
  outline: 0;
  font-family: ${(props) => props.theme.fonts.body};
  line-height: ${(props) => props.theme.lineHeights.body};

  ::placeholder,
  ::-webkit-input-placeholder {
    color: ${(props) => rgba(props.theme.colors.white, 0.8)};
  }
  :-ms-input-placeholder {
    color: ${(props) => rgba(props.theme.colors.white, 0.8)};
  }
`

export const NewsletterButton = styled.div`
  margin-left: ${(props) => props.theme.space.md * 1.5}px;
`

export const Heading = styled.h4`
  font-size: ${(props) => props.theme.fontSizes.md}px;
  line-height: ${(props) => props.theme.lineHeights.heading};
  margin-bottom: ${(props) => props.theme.space.lg}px;
`

export const Note = styled.section`
  font-size: ${(props) => props.theme.fontSizes.small}px;
  grid-area: note;
  opacity: 0.5;
`

export const Navigation = styled.nav``

export const Links = styled.ul`
  display: block;

  margin: 0;
  padding: 0;
  list-style-type: none;

  > * {
    flex: 0;
  }
`

export const LinkItem = styled.li`
  padding: 0;
  margin: 0;

  & + & {
    margin-top: ${(props) => props.theme.space.md}px;
  }

  > ${Link} {
    color: ${(props) => props.theme.colors.white};
  }
`
