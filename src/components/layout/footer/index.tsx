import { graphql, useStaticQuery } from 'gatsby'
import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { Button, ButtonSize } from '../../buttons'
import { Link } from '../../links'
import Section from '../section'
import * as S from './styles'

const Footer: React.FC = () => {
  const theme = useContext(ThemeContext)
  const { listID, accID } = useStaticQuery<{
    site: { siteMetadata: { ecomail: { listID: string; accID: string } } }
  }>(graphql`
    query EcomailQuery {
      site {
        siteMetadata {
          ecomail {
            listID
            accID
          }
        }
      }
    }
  `).site.siteMetadata.ecomail

  const t = {
    headings: {
      ceskoDigital: 'Česko.Digital',
      online: 'Online',
      newsletter: 'Newsletter',
    },
    info: {
      projects: ['Projekty', '#'],
      blog: ['Blog', '#'],
      loginToSlack: ['Přihlásit se do Slacku', '#'],
      submitProject: ['Zadat projekt', '#'],
      contribute: ['Přispět', '#'],
    },
    social: {
      facebook: ['Facebook', '#'],
      twitter: ['Twitter', '#'],
      github: ['GitHub', '#'],
      slack: ['Slack', '#'],
    },
    newsletter: {
      note:
        'Chcete vědět, na čem pracujeme? Jednou za měsíc shrneme, co se v komunitě událo a co chystáme.',
      inputPlaceholder: 'Zadejte e-mail',
      subscribe: 'Odebírat',
    },
    footnote: 'cesko.digital © 2020, Tento web používa cookies ¯\\_(ツ)_/¯',
  }

  return (
    <Section as={'footer'} backgroundColor={theme.colors.darkGrey}>
      <S.Outer>
        <S.Container>
          <S.Info>
            <S.InfoBlock>
              <S.Heading>{t.headings.ceskoDigital}</S.Heading>
              <S.Navigation>
                <S.Links>
                  {Object.values(t.info).map(([name, url], i) => (
                    <S.LinkItem key={i}>
                      <Link size={ButtonSize.Small} to={url}>
                        {name}
                      </Link>
                    </S.LinkItem>
                  ))}
                </S.Links>
              </S.Navigation>
            </S.InfoBlock>
            <S.InfoBlock>
              <S.Heading>{t.headings.online}</S.Heading>
              <S.Navigation>
                <S.Links>
                  {Object.values(t.social).map(([name, url], i) => (
                    <S.LinkItem key={i}>
                      <Link
                        size={ButtonSize.Small}
                        to={url}
                        key={i}
                        target="_blank"
                      >
                        {name}
                      </Link>
                    </S.LinkItem>
                  ))}
                </S.Links>
              </S.Navigation>
            </S.InfoBlock>
          </S.Info>
          <S.Newsletter>
            <S.Heading>{t.headings.newsletter}</S.Heading>
            <S.NewsletterInfo>{t.newsletter.note}</S.NewsletterInfo>
            <S.NewsletterForm
              action={`https://ceskodigital.ecomailapp.cz/public/subscribe/${listID}/${accID}`}
              method="POST"
            >
              <S.NewsletterInput
                name="email"
                placeholder={t.newsletter.inputPlaceholder}
              />
              <S.NewsletterButton>
                <Button>{t.newsletter.subscribe}</Button>
              </S.NewsletterButton>
            </S.NewsletterForm>
          </S.Newsletter>
          <S.Note>{t.footnote}</S.Note>
        </S.Container>
      </S.Outer>
    </Section>
  )
}

export default Footer
