import { graphql, useStaticQuery } from 'gatsby'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ThemeContext } from 'styled-components'
import { Button, ButtonSize } from '../../buttons'
import { Link } from '../../links'
import Section from '../section'
import * as S from './styles'

const Footer: React.FC = () => {
  const theme = useContext(ThemeContext)
  const [email, setEmail] = useState('')
  const [isInvalid, setInvalid] = useState(false)
  const [isTouched, setTouched] = useState(false)
  const emailEl = useRef<HTMLInputElement>(null)

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

  useEffect(() => validateForm(), [email, isTouched])

  const validateForm = (): void => {
    const isInvalid =
      !emailEl.current?.validity.valid ||
      (isTouched && email.trim().length === 0)
    setInvalid(isInvalid)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    // has been validated beforehand
    if (isInvalid) {
      e.preventDefault()
      return
    }
    // was never touched, force validation rerun, but this time consider empty values invalid
    if (!isTouched) {
      setTouched(true)
      e.preventDefault()
    }
  }

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
      inputErr: 'Zadejte prosím validní e-mailovou adresu.',
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
              onSubmit={onSubmit}
              action={`https://ceskodigital.ecomailapp.cz/public/subscribe/${listID}/${accID}`}
              method="POST"
            >
              <S.NewsletterFormControl>
                <S.NewsletterInput
                  name="email"
                  type="email"
                  value={email}
                  ref={emailEl}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setTouched(true)
                  }}
                  placeholder={t.newsletter.inputPlaceholder}
                />
                <S.NewsletterInputErrMessage
                  className={isInvalid ? 'is-visible' : ''}
                >
                  {t.newsletter.inputErr}
                </S.NewsletterInputErrMessage>
              </S.NewsletterFormControl>
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
