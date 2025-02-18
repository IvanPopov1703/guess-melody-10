import {ChangeEvent} from 'react';
import Logo from '../../components/logo/logo';
import {QuestionArtist, UserArtistQuestionAnswer} from '../../types/question';

type ArtistQuestionScreenProps = {
  question: QuestionArtist,
  onAnswer: (question: QuestionArtist, answer: UserArtistQuestionAnswer) => void;
};

function ArtistQuestionScreen(props: ArtistQuestionScreenProps): JSX.Element {
  const {question, onAnswer} = props;
  const {answers, song} = question;

  return (
    <section className="game game--artist">
      <header className="game__header">
        <Logo />

        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370"
            style={{filter: 'url(#blur)', transform: 'rotate(-90deg) scaleY(-1)', transformOrigin: 'center'}}
          />
        </svg>

        <div className="game__mistakes">
          <div className="wrong" />
          <div className="wrong" />
          <div className="wrong" />
        </div>
      </header>

      <section className="game__screen">
        <h2 className="game__title">Кто исполняет эту песню?</h2>
        <div className="game__track">
          <div className="track">
            <button className="track__button track__button--play" type="button" />
            <div className="track__status">
              <audio
                src={song.src}
              />
            </div>
          </div>
        </div>

        <form className="game__artist">
          {answers.map((answer, id) => (
            <div key={answer.artist} className="artist">
              <input
                className="artist__input visually-hidden"
                type="radio"
                name="answer"
                value={`answer-${id}`}
                id={`answer-${id}`}
                onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                  evt.preventDefault();
                  onAnswer(question, answer.artist);
                }}
              />
              <label className="artist__name" htmlFor={`answer-${id}`}>
                <img className="artist__picture" src={answer.picture} alt={answer.artist} />
                {answer.artist}
              </label>
            </div>
          ))}
        </form>
      </section>
    </section>
  );
}

export default ArtistQuestionScreen;
