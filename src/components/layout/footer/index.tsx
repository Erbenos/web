import { graphql, useStaticQuery } from 'gatsby'
import useForm, { ValidationErrors } from 'hooks/useForm'
import React, { useRef } from 'react'
import { ButtonSize } from '../../buttons'
import { Link } from '../../links'
import * as S from './styles'

const Footer: React.FC = () => {
  const { values, errors, handleSubmit, handleChange } = useForm<{
    email: string
  }>({ email: '' }, onSuccess, validate)
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

  function onSuccess(): void {
    alert('on success')
  }

  function validate(): ValidationErrors<typeof values> {
    const errors =
      emailEl.current?.validity.valid &&
      emailEl.current?.value.trim().length !== 0
        ? null
        : { email: t.newsletter.inputErr }
    return errors
  }

  return (
    <S.Wrapper>
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
              onSubmit={handleSubmit}
              action={`https://ceskodigital.ecomailapp.cz/public/subscribe/${listID}/${accID}`}
              method="POST"
              noValidate
            >
              <S.NewsletterFormControl>
                <S.NewsletterInput
                  name="email"
                  type="email"
                  value={values.email || ''}
                  ref={emailEl}
                  onChange={handleChange}
                  placeholder={t.newsletter.inputPlaceholder}
                />
              </S.NewsletterFormControl>
              <S.NewsletterButton>{t.newsletter.subscribe}</S.NewsletterButton>
              <S.NewsletterInputErrMessage
                className={errors?.email ? 'is-visible' : ''}
              >
                {t.newsletter.inputErr}
              </S.NewsletterInputErrMessage>
            </S.NewsletterForm>
          </S.Newsletter>
          <S.Note>{t.footnote}</S.Note>
        </S.Container>
      </S.Outer>
    </S.Wrapper>
  )
}

export default Footer
